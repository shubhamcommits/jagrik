import { Card, Task, Team, User } from '../models'
import { Readable } from 'stream'
import { cards } from '../utils/data'

export class TaskService {
         /**
          * This function is responsible for creating the lists of the tasks
          * @param tasks
          */
         async initTasks(tasks: Array<any>) {
           return new Promise((resolve) => {
             // Create readable stream from the array list of tasks
             const readableStream = Readable.from(tasks);

             // Turn on the stream and repeat the process to create tasks
             readableStream.on('data', async (task) => {
               // Split the term into 3 different objects
               task._card = task.card.split(' ');

               // Set the category of tasks
               task.category =
                 task.title.split('-')[1] == 'Com' ? 'community' : 'self';

               // Find the card on the basis of the theme and dice_number
               let card: any = await Card.findOne({
                 theme: task._card[0] + ' ' + task._card[1],
                 dice_number: parseInt(task._card[2]),
               });

               // Set the _card property
               task._card = card._id;

               // Create list of tasks
               await Task.create(task);
             });

             // Resolve promise with success
             resolve('Tasks created!');
           });
         }

         /**
          * This function fetches all the tasks related to a particular cardId
          * @param cardId
          */
         async getTasks(cardId: any) {
           try {
             let card = await Card.findById(cardId);

             let tasks = await Task.find({
               _card: cardId,
             });

             return {
               card: card,
               tasks: tasks,
             };
           } catch (err) {
             throw new Error(err);
           }
         }

         /**
          * This function fetches all the tasks related to a particular teamId
          * @param cardId
          */
    async getTasksByTeamId(teamId: any) {
       
        return new Promise(async (resolve, reject) => {
             let tasks:any = await Team.findOne({
               _id: teamId,
             });
             let taskData = {}
             if (tasks && tasks.tasks.length > 0) {
                 
                await tasks.tasks.forEach(async (element) => {
                   if(element.is_active === 'inactive'){
                      await Task.findOne({
                        _id: element._task,
                      }).populate('_card').then((task) => {
                          if (task) {
                            let newEle: any = {};
                            newEle.status = element['status'];
                            newEle.description = element['description'];
                            newEle.supporting_doc = element['supporting_doc'];
                            newEle.task_title = task['title'];
                            newEle.team_name = tasks['team_name'];
                            newEle.team_task_description = task['description'];
                            newEle.team_task_type = task['type'];
                            newEle.team_task_points = task['points'];
                            newEle.week = element['week'];
                            newEle.team_card_theme = task['_card']['theme'];
                            newEle.team_card_dice_number = task['_card']['dice_number']
                              newEle.team_card_description =
                                task['_card']['description'];
                            newEle.type = 'team';

                             if (
                               element['status'] === 'complete' &&
                              element['is_active'] === 'active'
                             ) {
                               newEle.status_text = 'Waiting for approval';
                             } else if (
                               element['status'] === 'complete' &&
                               element['is_active'] === 'inactive'
                             ) {
                               newEle.status_text = 'Completed';
                             } else if (element['status'] === 'to do') {
                               newEle.status_text = 'Pending';
                             } else if (element['status'] === 'rejected') {
                               newEle.status_text = 'Rejected';
                             }
                            newEle.comment = element['comment'];
                            newEle.bonus_point = element['bonus_point'];
                            newEle.team_task_supporting_docs = element['supporting_docs'];
                            newEle.team_task_ques_review = element['ques_review'];
                            newEle.reason = element['status'] == 'rejected' ? element['reason'] : '';
                          
                            let team = { 'team': newEle}
                            
                            taskData[element['week']] = team;
                          }
                        });
                     }       
                  });
             }
            
             tasks.team_members.forEach(async (element1, index) => {
                  await User.findOne({ _id: element1 }).then((user) => {
                      if (user && user['tasks'].length > 0) {
                          
                        user['tasks'].forEach(async (element) => {
                          if (element.status && element.status === 'complete') {
                            await Task
                              .findOne({
                                _id: element._task,
                              }).populate('_card').then((task) => {
                               
                                if (task && taskData[element['week']]) {
                                  let newEle: any = {};
                                  newEle.status = element['status'];
                                  newEle.description = element['description'];
                                  newEle.supporting_doc =
                                    element['supporting_doc'];
                                  newEle.task_title = task['title'];
                                  newEle.user_task_description = task['description'];
                                  newEle.user_name =
                                      user['first_name'] +
                                      ' ' +
                                      user['last_name'];
                                  newEle.user_profile =
                                    user['profile_pic'];
                                  newEle.user_task_points = task['points'];
                                  newEle.user_task_type = task['type'];
                                  newEle.card_theme = task['_card']['theme'];
                                  newEle.dice_number = task['_card']['dice_number'];
                                  newEle.week = element['week'];
                                  newEle.user_task_supporting_docs = element['supporting_docs'];
                                  newEle.user_task_ques_review = element['ques_review'];
                                  newEle.type = 'single';
                                  if (!taskData[element['week']]['user']) {
                                    taskData[element['week']]['user'] = []
                                  }
                                  if (taskData[element['week']]['status_text'] === 'Waiting for approval' && element['status'] === 'to do') {
                                    taskData[element['week']]['status_text'] = 'Incomplete'
                                  }
                                  taskData[element['week']]['user'].push(newEle);
                                }
                              });
                             
                          }
                        });
                       
                      }
                  });
             });
               
            //  return setTimeout(() => {
            //      taskData;
            //  }, 10000);
            setTimeout(() => {
              resolve(taskData);
            }, 10000);
             
          })
         }
       }
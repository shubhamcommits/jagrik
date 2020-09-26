import { User, Card, Team, Collaborate } from "../models";
import { Readable } from 'stream'
import jwt from "jsonwebtoken";

export class TeamService {
  /**
   * This function is responsible for assigning a random card to team
   * @param card_theme
   * @param week
   * @param token
   */
  async assignRandomSelfCard(
    card_theme: any,
    week: any,
    teamId: string,
    diceNumber: any
  ) {
    try {
      // Find the list of cards
      let team: any = await Team.findOne({ _id: teamId });
      let usedCardIds = team.tasks.map((card) => {
        return card._card;
      });
      let cards = await Card.find({
        theme: card_theme,
        _id: { $nin: usedCardIds },
        dice_number: diceNumber,
      });

      // Map the list of card Ids
      let cardIds = cards.map((card) => {
        return card._id;
      });

      // Random card Index
      let randomCardIndex = Math.floor(Math.random() * cardIds.length);

      // Random card
      let task = {
        _card: cardIds[randomCardIndex],
        week: week,
      };

      // check if task exist or not
      let taskExistForWeek = await Team.findOne({
        _id: teamId,
        tasks: { $elemMatch: { week: week } },
      });

      if (!taskExistForWeek) {
        // Find the team
        let team: any = await Team.findOneAndUpdate(
          { _id: teamId },
          { $push: { tasks: task } },
          { new: true }
        );

        // List of all users
        let userIds = team.team_members;

        // Create readable stream from the array list of userIds
        const readableStream = Readable.from(userIds);

        // Turn on the stream and repeat the process to update the users
        readableStream.on('data', async (userId) => {
          await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { tasks: task } },
            { new: true }
          );
        });

        return {
          team: team,
          card: cards[randomCardIndex],
        };
      } else {
        // Catch unexpected errors
        throw new Error('Card has already been assigned to the week!');
      }
    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async submitTaskPoints(
    token: any,
    teamId: string,
    teamPoints: any,
    comment: any,
    bonus_points: any,
    taskId: any,
    isPoint: any
  ) {
    try {
      // verify token and decode user data
      let userVerify: any = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_KEY
      );
      let user: any = await User.findById({ _id: userVerify._id });
      // check if the user has the correct permissions to create a class
      if (user.role === 'facilitator' || user.role === 'super-admin') {
        let team: any = await Team.findOne({
          _id: teamId,
          team_creator: user._id,
        });
        let collabData = {};
        let isCollbrate = false;
        if (team) {
          let teamTask = [];
          let is_update: Boolean = false;
          team.tasks.forEach((element) => {
            let item = element;
            if (element.is_active === 'active' && element.id == taskId) {
              is_update = true;
              element.is_active = 'inactive';
              element.comment = comment;
              element.bonus_point = bonus_points;

              if (element.help_team.length > 0) {
                isCollbrate = !isCollbrate;
                collabData = {
                  team_1: element.help_team[0]['team_1'],
                  team_2: element.help_team[0]['team_2'],
                  week: element.help_team[0]['week'],
                  type: element.help_team[0]['type'],
                  points:
                    element.help_team[0]['type'] === 'gold'
                      ? 5
                      : element.help_team[0]['type'] === 'silver'
                      ? 3
                      : 1,
                };
              }
            }

            teamTask.push(element);
          });
          if (is_update === true) {
            if (isCollbrate && isPoint === 'Yes') {
              await Collaborate.create(collabData);
              let team2: any = await Team.findOne({
                team_name: collabData['team_2'],
              });
              await Team.findOneAndUpdate(
                { team_name: collabData['team_2'] },
                {
                  points:
                    parseInt(team2.points) + parseInt(collabData['points']),
                }
              );
            }
            await Team.findOneAndUpdate(
              { _id: teamId },
              {
                points: parseInt(teamPoints) + parseInt(team.points),
                tasks: teamTask,
              }
            );
          }
          return;
        } else {
          throw new Error('401 - Access denied');
        }
      } else {
        throw new Error('401 - Access denied');
      }
    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async rejectTeamTask(
    token: any,
    teamId: string,
    teamPoints: any,
    comment: string,
    taskId: string
  ) {
    try {
      // verify token and decode user data
      let userVerify: any = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_KEY
      );
      let user: any = await User.findById({ _id: userVerify._id });
      // check if the user has the correct permissions to create a class
      if (user.role === 'facilitator' || user.role === 'super-admin') {
        let team: any = await Team.findOne({
          _id: teamId,
          team_creator: user._id,
        });

        if (team) {
          let teamTask = [];
          let is_update: Boolean = false;
          team.tasks.forEach((element) => {
            let item = element;

            if (element.is_active === 'active' && element.id === taskId) {
              is_update = true;
              item.status = 'rejected';
              item['reason'] = comment;
              item.is_active = 'inactive';
            }

            teamTask.push(item);
          });
          if (is_update === true) {
            await Team.findOneAndUpdate(
              { _id: teamId },
              {
                points: parseInt(teamPoints) + parseInt(team.points),
                tasks: teamTask,
              }
            );
          }
          return;
        } else {
          throw new Error('401 - Access denied');
        }
      } else {
        throw new Error('401 - Access denied');
      }
    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async teamTaskStatus(token: any, teamId: string, type: string) {
    try {
      // verify token and decode user data
      let userVerify: any = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_KEY
      );

      // check all existing task status
      let team: any = await Team.findOne({ _id: teamId });
      let taskStatus = false;
      let taskCount = 0;
      let cardId = '';
      team.tasks.forEach((element) => {
        if (
          element.is_active &&
          element.is_active === 'active' &&
          element.type === type
        ) {
          taskStatus = true;
          cardId = element._card;
        }
        if (element.type === type) {
          taskCount++;
        }
      });

      if (taskStatus === false) {
        return {
          status: true,
          week: taskCount + 1,
        };
      } else {
        return {
          status: false,
          cardId: cardId,
          week: taskCount,
        };
      }
    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }

  async teamDiceStatus(token: any, teamId: string) {
    try {
      // verify token and decode user data
      let userVerify: any = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_KEY
      );

      // check all existing task status
      let team: any = await Team.findOne({ _id: teamId });
      let taskStatus = false;

      let usedCardIds = team.tasks.map((card) => {
        return card._card;
      });
      let cards = await Card.find({
        _id: { $in: usedCardIds },
      });

      return {
        status: true,
        card: cards,
      };
    } catch (err) {
      // Catch unexpected errors
      throw new Error(err);
    }
  }
}
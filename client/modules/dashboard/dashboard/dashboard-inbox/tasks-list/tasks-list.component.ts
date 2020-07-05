import { Component, OnInit, Injector, Input } from '@angular/core';
import { TeamService } from '../../shared/services/team.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  constructor(
    private injector: Injector
  ) { }

  data: any = {
    tasks: [],
    card: {}
  }

  userData: any

  @Input('cardId')cardId: any

  async ngOnInit() {
    this.data = await this.getTaskList(this.cardId)
    this.userData = this.getUserData()
  }


  getUserData() {
    const storageService = this.injector.get(StorageService)
    return storageService.getLocalData('userData')
  }

  getTaskList(cardId: any) {
    return new Promise((resolve) => {

      const teamService = this.injector.get(TeamService)

      teamService.fetchTasks(cardId)
        .then((res) => {

         res['tasks'].forEach(task => {
             task.title = (task.title.split("-")[1] == 'Com') ? 'Community Task': 'Self Task'

             if(task.title == 'Self Task'){

              let userData = this.getUserData()

                if(userData.tasks[userData.tasks.length - 1].status == 'to do'){
                  task.status = 'to do'
                }
             }

          })

          resolve({
            tasks: res['tasks'],
            card: res['card']
          })
        })
        .catch(() => {
          resolve({

          })
        })

    })
  }

}

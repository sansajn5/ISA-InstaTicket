import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';

@Component({
    selector: 'ngx-grid-picker',
    templateUrl: './grid-picker.component.html',
    styleUrls: ['./grid-picker.component.scss']
})
export class GridPickerComponent implements OnInit {

    @Input() row;
    @Input() colum: number;
    @Input() mode: string;
    @Input() type: string;
    @Input() editedGrid;

    @Output() gridIsSet: EventEmitter<any> = new EventEmitter<any>();
    
    public fullGrid = [];
    public grid = [];
    public numberOfOptions: number;

    constructor(private spinnerService: NbSpinnerService) {}

    ngOnInit() {
        this.gridSetup();
    }

    gridSetup() {
        if(this.type === 'add') {
            const gridLength = this.row * this.colum;
            for(let i=1; i <= gridLength; i++) {
                this.grid.push({
                    state: "CLASSIC",
                    id: i,
                    seatType: "REGULAR_SEAT"
                })
            }
            for(let j=0; j< this.row; j++) {
                let temp = [];
                let counter = 1;
                for(let i=j*this.colum; i< (j+1) * this.colum; i++) {
                    this.grid[i].x = j+1
                    this.grid[i].y = counter;
                    temp.push(this.grid[i]);
                    counter++;
                }
                this.fullGrid.push(temp);
            }
        } else if (this.type === 'edit') {
            this.grid = this.editedGrid;
            for(let j=0; j< this.row; j++) {
                let temp = [];
                for(let i=j*this.colum; i< (j+1) * this.colum; i++) {
                    this.grid[i].state = this.grid[i].type
                    temp.push(this.grid[i]);
                }
                this.fullGrid.push(temp);
            }
        }
    }

    seatPressed(seat) {
        if(this.mode === 'ADMIN' && this.type === 'add'){
            if(seat.state === 'CLASSIC')
                seat.state = 'VIP'
            else if(seat.state === 'VIP') 
                seat.state = 'QUICK'
            else if(seat.state === 'QUICK') 
                seat.state = 'NOT SEAT'
            else if(seat.state === 'NOT SEAT')
                seat.state = 'CLASSIC'
        } else if (this.mode === 'ADMIN' && this.type === 'edit'){
            if(seat.state === 'CLASSIC')
                seat.state = 'VIP'
            else if(seat.state === 'VIP') 
                seat.state = 'QUICK'
            else if(seat.state === 'QUICK') 
                seat.state = 'NOT SEAT'
            else if(seat.state === 'NOT SEAT')
                seat.state = 'CLASSIC'
        } else {
            if(seat.state = 'RESERVED') {
                seat.state = seat.old
            }
            else if(seat.state === 'CLASSIC') {
               seat.state = 'RESERVED'
               seat.old = 'CLASSIC'
            }
            else if(seat.state === 'VIP') {
                seat.state = 'RESERVED'
                seat.old = 'VIP'
             }
             else if(seat.state === 'QUICK') {
                seat.state = 'RESERVED'
                seat.old = 'QUICK'
            }
        }
    }

    confirmGrid() {
        const arrayForApi = [];
        if(this.type !== 'edit') {
            this.grid.forEach( el => {
                const is = (el.state === 'NOT SEAT') ? false : true
                const seat = {
                    cordX: el.x,
                    cordY: el.y,
                    isSeat: is,
                    type: el.state
                }
                arrayForApi.push(seat);
            })
        } else {
            this.grid.forEach( el => {
                const seat = {
                    cordX: el.cordX,
                    cordY: el.cordY,
                    isSeat: el.isSeat,
                    type: el.state
                }
                arrayForApi.push(seat);
            })
        }
        this.gridIsSet.emit(arrayForApi);
    }



}
import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    public profileImage: string;
    public profileUsername: string;

    public friends: any[];
    public recentVisitis: any[];

    constructor(private spinnerService: NbSpinnerService, private router: Router) {}

    ngOnInit() {
        this.friends = [
            {user: 'nick', type: 'mobile'},
            {user: 'eva', type: 'home'},
            {user: 'jack', type: 'mobile'},
            {user: 'lee', type: 'mobile'},
            {user: 'alan', type: 'home'},
            {user: 'kate', type: 'work'},
        ]

        this.recentVisitis = [
            {user: 'nick', type: 'mobile'},
            {user: 'eva', type: 'home'},
            {user: 'jack', type: 'mobile'},
            {user: 'lee', type: 'mobile'},
            {user: 'alan', type: 'home'},
            {user: 'kate', type: 'work'},
        ]
        this.profileUsername = "sansajn"
        this.profileImage = '../../../../assets/images/alan.png'
    }

}
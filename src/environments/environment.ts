// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  gameURL:'http://localhost',
  gamePort:'8080',

  user:{
    updateProfile : '/user/updateProfile',
    getInfo : '/user/info',
    uploadPix:'/user/uploadPix',
    getPix:'/user/profile',
    list:'/user/userList'
  },
  game:{
    requestPlay:'/game/requestPlay',
    requestStatus: '/game/requestStatus',
    get: '/game/get',
    dice:'/gameSession/dice',
    status:'/gameSession/status',
    hold:'/gameSession/hold',

    create:'/game/create',
    list:'/game/AllGames',

  },
  comment:{
    unApprovedComments:'/comment/unAprrovedGame',
    changeStatusGame:'/comment/changeStatusGame',
    approvedGameComments:'/comment/listOfGameComment',
    unApprovedUserComment:'/comment/unApprovedUserComment',
    changeStatusUser:'/comment/changeStatusUser',
    approvedUserComments:'/comment/listOfUserComment'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

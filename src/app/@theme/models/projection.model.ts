export class Projection {
  constructor(public eventName: string,
              public hallName: string,
              public startTime: string,
              public endTime: string,
              public date: string,
              public seatDTO: any,
              public regularPrice: number,
              public vipPrice: number,
              public balconyPrice: number,
  ) {}
}

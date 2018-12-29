export class EventModel {
  constructor(public name: string,
              public type: string,
              public actors?: string,
              public director?: string,
              public duration?: string,
              public imageUrl?: string,
              public description?: string,
  ) {}
}

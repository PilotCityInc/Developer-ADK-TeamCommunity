export interface MongoDoc {
  data: {
    adks: Record<string, any>[];
  };
  save: () => Promise<any>;
  changeStream: any;
}

export interface TeamDoc {
  data: {
    name: string;
    members: Record<string, any>[];
  };
}

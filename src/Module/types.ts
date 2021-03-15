export interface MongoDoc {
  data: Record<string, any>;
  update: () => Promise<any>;
  changeStream: any;
}

export interface TeamDoc {
  data: {
    _id: number;
    owner: number;
    password: string;
    name: string;
    members: Record<string, any>[];
  };
}

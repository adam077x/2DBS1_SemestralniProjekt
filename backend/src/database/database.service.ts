import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as oracledb from 'oracledb';
import { dbConfig } from '../config/database.config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: oracledb.Connection;

  async onModuleInit() {
    this.connection = await oracledb.getConnection(dbConfig);
  }

  async onModuleDestroy() {
    await this.connection.close();
  }

  async execute(query: string, params: any = {}): Promise<any> {
    return this.connection.execute(query, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
  }

  commit() {
    this.connection.commit();
  }
}

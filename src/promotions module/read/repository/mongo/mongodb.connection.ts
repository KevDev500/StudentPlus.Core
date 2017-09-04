import { DbConnection } from './../interfaces/db.connection';
import { Component } from '@nestjs/common';
import * as config from 'config';
import * as mongodb from 'mongodb';

const opts: any = config.get('mongodb');

@Component()
export class MongoDbConnection extends DbConnection {

    private _state: { connection: mongodb.Db } = { connection: null };

    async open() {
        if (!this._state.connection) {
            let db;
            try {
                db = await mongodb.MongoClient.connect(opts.connectionUrl, opts.clientOpts);
                this._state.connection = db;
                return Promise.resolve(this._state.connection);
            } catch (error) {
                return Promise.reject('Mongodb connection error');
            }
        } else {
            return Promise.resolve(this._state.connection);
        }
    }

    async connect(schema): Promise<mongodb.Collection<any>> {

        if (!this._state.connection) {
            try {
                await this.open();
            }
            catch (error) {
                console.log(error);
            }
        }

        const deferred: Promise<mongodb.Collection<any>> = new Promise((resolve, reject) => {
            this._state.connection.collection(schema, opts.collectionOpts, (err, collection) => {
                if (err) reject(err);
                else resolve(collection);
            });
        })

        return deferred;
    }


    close(): Promise<any> {

        const deferred = new Promise((resolve, reject) => {
            if (this._state.connection) {
                this._state.connection.close((err, result) => {
                    if (err) return reject(err);
                    else {
                        this._state.connection = null;
                        resolve();
                    }
                });
            }

            resolve();
        });

        return deferred;
    }
}
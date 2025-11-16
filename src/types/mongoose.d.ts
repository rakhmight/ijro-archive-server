declare type ModelExC<T> = import('mongoose').Model<T>
declare type DocumentExC = import('mongoose').Document

declare interface Models {
    SessionModel: SessionModelI;
    FileModel: FileModelI;
}

declare interface Db {
    models: Models;
}
// define options
declare interface MyPluginOptions {
}
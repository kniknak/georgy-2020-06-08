export interface FileInfo {
    originalName: string
    size: number
    _id: string
    createdAt: number
}

export enum Status {
    Initial = 1,
    Loading,
    Success,
    Error,
}
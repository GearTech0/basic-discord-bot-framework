export interface ContestFile {
  name: string;
  url: string;
  [key: string]: any;
}

export interface ContestData { // to be removed
  contestActive: boolean;
  contestChannelName: string;
  contestChannelId?: string;
  gDriveFolder?: string;
  messageId?: string;
  entries?: { [key: string]: ContestFile };
  pastEntries?: { [key: string]: ContestFile };
  reactions: {};
}

export interface ContestConfig {
  channelName: string;
  reactions: {};
  sampleEntries: number;
}

export interface VoteInfo {
  voteStage: 'sample' | 'submission' | 'complete';
  contestChannelId: string;
  messageId: string;
  entries?: { [key: string]: ContestFile };
}

import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class VideoNotFoundException extends CustomNotFoundException {
  constructor(videoId: string) {
    super(videoId, 'Video');
  }
}

export class VideoBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'Video');
  }
}

export class VideoUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'Video', additionalInfo);
  }
}

export class VideoForbiddenException extends CustomForbiddenException {
  constructor(actorId: string, videoId: string, action: string) {
    super(actorId, videoId, action, 'Video');
  }
}

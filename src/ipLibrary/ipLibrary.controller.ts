import { Controller } from '@nestjs/common'
import { IpLibraryService } from './ipLibrary.service'

@Controller('ipLibrary')
export class IpLibraryController {
  constructor(private readonly ipLibraryService: IpLibraryService) {}
}

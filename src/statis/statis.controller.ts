import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { StatisService } from './statis.service'

@ApiTags('统计')
@Controller('statis')
export class StatisController {
  constructor(private readonly statisService: StatisService) {}
}

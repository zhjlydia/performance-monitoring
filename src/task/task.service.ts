import { EnvironmentService } from '@/environment/environment.service'
import { StatisService } from '@/statis/statis.service'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { formatQueryDatetoUtc } from 'core/utils'
import dayjs from 'dayjs'

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name)
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly statisService: StatisService
  ) {}

  @Cron('0 0 1 * * *')
  async pvAnduvByDay(): Promise<boolean> {
    const begin = dayjs()
      .subtract(1, 'day')
      .startOf('date')
      .format('YYYY-MM-DD')
    const end = dayjs()
      .startOf('date')
      .format('YYYY-MM-DD')
    const [pv, uv] = await Promise.all([
      this.environmentService.pv({ begin, end }),
      this.environmentService.uv({ begin, end })
    ])
    const pvStatis = pv.map(item => {
      return {
        appId: item.appId,
        type: 'pv',
        data: item.pv,
        time: formatQueryDatetoUtc(begin)
      }
    })
    const uvStatis = uv.map(item => {
      return {
        appId: item.appId,
        type: 'uv',
        data: item.uv,
        time: formatQueryDatetoUtc(begin)
      }
    })
    try {
      const res = await this.statisService.createMany(pvStatis.concat(uvStatis))
      return res
    } catch (e) {
      return false
    }
  }
}

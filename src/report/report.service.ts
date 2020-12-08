import { randomString } from '@/common/utils'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateReportDto } from 'core/models/report'
import { Report, ReportDocument } from 'core/schemas/report.schema'
import { Model } from 'mongoose'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>
  ) {}

  async create(
    ip: string,
    userAgent: string,
    createReportDto: CreateReportDto
  ): Promise<Report> {
    const newReport = new this.reportModel({
      ip,
      userAgent,
      reportMark: randomString(),
      ...createReportDto
    })
    return newReport.save()
  }
}

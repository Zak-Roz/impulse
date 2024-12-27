import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { EventNameTypes } from '../../../../common/src/resources/campaign-reports';

export const uniqueFieldsCampaignReport = ['event_time', 'client_id', 'event_name'];

@Entity('campaign_reports')
@Unique('IDX_uniq_event_time_client_id_event_name', uniqueFieldsCampaignReport)
export class CampaignReport extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  campaign: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  campaign_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  adgroup: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  adgroup_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  ad: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  ad_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  client_id: string;

  @Column({
    type: 'enum',
    enum: [EventNameTypes.INSTALL, EventNameTypes.PURCHASE],
    default: EventNameTypes.INSTALL,
  })
  event_name: EventNameTypes;

  @Column({ type: 'timestamp without time zone' })
  event_time: Date;
}

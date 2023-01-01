import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { User } from './user'
import { DeviceType } from './device_type'






@Entity()
export class Config extends BaseEntity {

    @PrimaryGeneratedColumn()
    localId?: number

    @Column({ nullable: true })
    serverId?: number

    @Column()
    name?: string

    @Column()
    category?: string

    @Column('simple-json', { nullable: true })
    dpi?: Array<number>

    @Column()
    reportRate?: number

    @Column('simple-json')
    value?: ConfigValue[]

    @Column('simple-json')
    light?: LightSetting

    @Column('simple-json', { nullable: true })
    logoLight?: LightSetting

    @Column('simple-json', { nullable: true })
    lightPic?: Array<UserPicItem>

    @ManyToOne(type => User, user => user.configs)
    user?: User

    @ManyToOne(type => DeviceType, deviceType => deviceType.configs)
    deviceType?: DeviceType

    @Column()
    isShared: boolean = false

    @Column()
    hasUpload: boolean = false

    @Column()
    needDelete: boolean = false

    // @Column('simple-json', { nullable: true })
    // other?: Other
}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './user'
import { DeviceType } from './device_type' 


@Entity()
export class Macro extends BaseEntity {

    @PrimaryGeneratedColumn()
    localId?: number

    @Column({ nullable: true })
    serverId?: number

    @Column()
    name?: string

    @Column({ nullable: true })
    category?: string

    @Column('simple-json')
    value?: ConfigMacro

    @ManyToOne(type => User, user => user.macros)
    user?: User

    @ManyToOne(type => DeviceType, deviceType => deviceType.macros)
    deviceType?: DeviceType

    @Column()
    @CreateDateColumn()
    createAt?: Date

    @Column()
    @UpdateDateColumn()
    updatedAt?: Date

    @Column()
    isShared: boolean = false

    @Column()
    hasUpload: boolean = false

    @Column()
    needDelete: boolean = false

}
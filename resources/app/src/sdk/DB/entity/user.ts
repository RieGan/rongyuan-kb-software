import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable, Unique } from 'typeorm'
import { Macro } from './macro'
import { Config } from './config'
import { DeviceType } from './device_type'

@Entity()
// @Unique(['name'])
// @Unique(['email'])
export class User extends BaseEntity {

    @PrimaryColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    gender: 'male' | 'female' = 'male'

    @Column()
    email?: string
    @Column()
    company?: string

    @OneToMany(type => Macro, macro => macro.user)
    macros?: Macro[]

    @OneToMany(type => Config, config => config.user)
    configs?: Config[]



    @ManyToMany(type => DeviceType, deviceTypes => deviceTypes.users)
    @JoinTable()
    // @JoinTable({
    //     inverseJoinColumns: [
    //         {
    //             name: 'pid',
    //             referencedColumnName: 'pid'
    //         },
    //         {
    //             name: 'vid',
    //             referencedColumnName: 'vid'
    //         }
    //     ]
    // })
    deviceTypes?: DeviceType[]

}
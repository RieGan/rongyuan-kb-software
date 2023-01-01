import { Entity, OneToOne, JoinColumn, BaseEntity } from "typeorm"
import { Config } from ".."




@Entity()
export class CurrentConfig extends BaseEntity {

    @OneToOne(type => Config, { nullable: true, onDelete: 'CASCADE', primary: true })
    @JoinColumn()
    currentConfig?: Config

}
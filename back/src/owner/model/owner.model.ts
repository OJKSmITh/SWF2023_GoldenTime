import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Owner extends Model {
  @Column({ type: DataTypes.ENUM('ambulance', 'hospital'), allowNull: false })
  owner: string;

  @Column({ type: DataTypes.STRING(42), allowNull: false })
  account: string;
}

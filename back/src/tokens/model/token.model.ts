import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Token extends Model {
  @Column({ type: DataTypes.INTEGER, allowNull: false })
  tokenId: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  uri: string;
}

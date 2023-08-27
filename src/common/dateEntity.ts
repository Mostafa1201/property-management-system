import { CreateDateColumn, UpdateDateColumn } from "typeorm";

// This function is created to add both createdAt and updatedAt columns at the end when creating the ORM tables
export function BaseTimeEntity() {
  return function (target: Function) {
    CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })(target.prototype, 'createdAt');
    UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })(target.prototype, 'updatedAt');
  };
}
import { Review } from 'src/reviews/reviews.entity';
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
@Entity()
export class ProfileReviews {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @OneToMany(() => Review, (review) => review.reviewed, { eager: true })
  reviewsHistory: Array<Review>;

  @Column({ default: 0 })
  averagePunctuation: number;
}

export class CreateProjectDto {
  readonly owner: string;
  readonly name: string;
  readonly readonlyurl: string;
  readonly stars: number;
  readonly forks: number;
  readonly issues: number;
  readonly createdAt: number;
  readonly userId: string;
}

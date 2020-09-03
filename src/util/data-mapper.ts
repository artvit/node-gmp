export interface DataMapper<Domain, DalEntity> {
  toDomain(de: DalEntity): Domain;
  toDalEntity(domain: Domain): DalEntity;
}

export interface GraphQLSchemaIntrospection {
  __schema: {
    queryType: GraphQLType;
    types: GraphQLType[];
  };
}

export interface GraphQLType {
  name: string;
  kind: string;
  fields?: GraphQLField[];
}

export interface GraphQLField {
  name: string;
  type: GraphQLFieldType;
}

export interface GraphQLFieldType {
  kind: string;
  name?: string;
  ofType?: GraphQLFieldType;
  fields?: GraphQLField[];
}

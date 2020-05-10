/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCareerImprovementClient = `query GetCareerImprovementClient($id: ID!) {
  getCareerImprovementClient(id: $id) {
    id
    username
    email
    accomplishments {
      accomplishment
      accomplishedOn {
        utc
        timezone
      }
    }
    goals {
      goal
      accomplishments {
        accomplishment
      }
    }
    owner
  }
}
`;
export const listCareerImprovementClients = `query ListCareerImprovementClients(
  $filter: ModelCareerImprovementClientFilterInput
  $limit: Int
  $nextToken: String
) {
  listCareerImprovementClients(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      username
      email
      accomplishments {
        accomplishment
        accomplishedOn {
          utc
          timezone
        }
      }
      goals {
        goal
        accomplishments {
          accomplishment
          accomplishedOn {
            utc
            timezone
          }
        }
      }
      owner
    }
    nextToken
  }
}
`;

import client from '../../client'

export interface GetSkillsParams {
    skillSet?: string
}

export default function getSkills({ skillSet }: GetSkillsParams = {}) {
    return client.get(`/skills`, {
        params: skillSet
            ? {
                  filter: skillSet,
              }
            : undefined,
    })
}

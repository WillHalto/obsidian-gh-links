// helper for getting issue/PR info from the github api

export interface Issue {
    title: string,
    number: number,
    url: string,
    state: string
}

export interface Pull {
    title: string,
    number: number,
    url: string,
    state: string,
    merged: boolean,
    draft: boolean
}

export const fetchIssueOrPR = async (nwo: string, type: "issues" | "pulls", number: number, token: string): Promise<Issue | Pull> => {
    const response = await fetch(`https://api.github.com/repos/${nwo}/${type}/${number}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    return response.json()
}

interface IssueURLMatchData {
    nwo: string,
    type: "issues" | "pull"
    number: number
}

export const matchIssueOrPRUrl = (url: string): IssueURLMatchData | null => {
    const githubUrlRegex = /https:\/\/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)\/(?<type>issues|pull)\/(?<number>\d+)/g;
    const match = githubUrlRegex.exec(url)

    if (!match?.groups ||
        !match.groups.owner ||
        !match.groups.repo ||
        !(match.groups.type == "issues" || match.groups.type == "pull") ||
        !parseInt(match.groups.number)) {

        return null
    }

    return {
        nwo: `${match.groups.owner}/${match.groups.repo}`,
        type: match.groups.type,
        number: parseInt(match.groups.number)
    }
}
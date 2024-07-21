import * as gh from 'gh'

type IconName = 
  | "issue-opened"
  | "issue-closed"
  | "git-pull-request"
  | "git-pull-request-draft"
  | "git-merge"
  | "git-pull-request-closed"

export class IconSelector {
	getIcon(data: gh.Issue | gh.Pull, type: "issues" | "pulls"): IconName {
		if (type == "pulls") {
			return this.getPullsIcon(data as gh.Pull)
		}
		else {
			return this.getIssuesIcon(data as gh.Issue)
		}
	}

	getPullsIcon(data: gh.Pull): IconName {
		if (data.state == "closed") {
			return data.merged ? "git-merge" : "git-pull-request-closed"
		}
		else {
			return data.draft ? "git-pull-request-draft" : "git-pull-request"
		}
	}

	getIssuesIcon(data: gh.Issue): IconName {
		if (data.state == "open"){
			return "issue-opened"
		}
		else {
			return "issue-closed"
		}
	}
}

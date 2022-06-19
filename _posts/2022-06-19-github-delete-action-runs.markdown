---
layout: post
title:  "Delete all github action runs"
date:   2022-06-19
---

Tested with `zsh`; deletes all action runs for specified repo.

{%highlight shell %}
function github-delete-action-runs {
    org=$1
    repo=$2

    # Get workflow IDs with status "disabled_manually"
    workflow_ids=($(gh api repos/$org/$repo/actions/workflows | jq '.workflows[] | .id'))

    for workflow_id in "${workflow_ids[@]}"
    do
        echo "... Deleting runs of workflow $workflow_id ..."
        run_ids=( $(gh api repos/$org/$repo/actions/workflows/$workflow_id/runs --paginate | jq '.workflow_runs[].id') )
        for run_id in "${run_ids[@]}"
        do
            echo "Deleting Run $run_id"
            gh api repos/$org/$repo/actions/runs/$run_id -X DELETE >/dev/null
        done
    done

    echo "... Deleting orphaned action runs ..."
    run_ids=( $(gh api repos/$org/$repo/actions/runs --paginate | jq '.workflow_runs[].id') )
    for run_id in "${run_ids[@]}"
    do
        echo "Deleting Run $run_id"
        gh api repos/$org/$repo/actions/runs/$run_id -X DELETE >/dev/null
    done
}
{%endhighlight%}

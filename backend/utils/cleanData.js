exports.cleanHostList = (e) => {
    let data = e.map((res) => ({
        id: res.user?.id || '0',
        nickname: res.user?.nickname || '0',
        gender: res.user?.gender || '0',
        avatar_thumb: res.user?.avatar_thumb.url_list[0] ||0,
        own_room: res.user?.own_room || '0',
        display_id: res.user?.display_id || '0',
        rank: res?.rank || '0',
        contributor_text: res?.contributor_text || '0',
        fansclub_name: res?.fansclub_name || '0',
        gap_description: res?.gap_description || '0'

    }))
    return data;
}

exports.cleanScoresList = (e) => {
    let data = e.map((res) => ({
        score: res?.score || 0,
        user_count: res.room?.user_count || 0

    }))
    return data;
}
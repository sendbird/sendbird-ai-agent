package com.sendbird.sdk.aiagent.sample.model

import com.sendbird.sdk.aiagent.sample.consts.KeySet
import org.json.JSONObject

internal data class ManualUserInfo(
    val userId: String,
    val authToken: String,
) {
    constructor(json: JSONObject): this(
        userId = json.getString(KeySet.userId),
        authToken = json.getString(KeySet.authToken),
    )

    constructor(jsonString: String): this(JSONObject(jsonString))

    fun toJson(): JSONObject {
        return JSONObject().apply {
            put(KeySet.userId, userId)
            put(KeySet.authToken, authToken)
        }
    }
}
// region public user info
internal val userUs3 = ManualUserInfo(
    userId = "client_user",
    authToken = "deb776838a0dca710fffd9c38b06ed133e2d088f",
)
// endregion

internal val userNo1 = ManualUserInfo(
    userId = "",
    authToken = "",
)

internal val userNo2 = ManualUserInfo(
    userId = "",
    authToken = "",
)

internal val userNo3 = ManualUserInfo(
    userId = "",
    authToken = "",
)

internal val userNo4 = ManualUserInfo(
    userId = "",
    authToken = "",
)

internal val userNo5 = ManualUserInfo(
    userId = "",
    authToken = "",
)

internal val userNo6 = ManualUserInfo(
    userId = "",
    authToken = "",
)

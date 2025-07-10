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

// dummy
internal val userNo1 = ManualUserInfo(
    userId = "",
    authToken = "",
)

// AMT warroom
internal val userNo2 = ManualUserInfo(
    userId = "client-user",
    authToken = "20670e9154f2828cc864d31df247f41282d2cc62",
)

// dummy
internal val userNo3 = ManualUserInfo(
    userId = "",
    authToken = "",
)

// dummy
internal val userNo4 = ManualUserInfo(
    userId = "and-client-user",
    authToken = "1c249166d9c177a51b7ea88455c12c09c02d4786",
)

internal val userNo5 = ManualUserInfo(
    userId = "aiagent-test-user",
    authToken = "d1d4002af98c4e8654f96efa60c1561cf9162784",
)

internal val userUs3 = ManualUserInfo(
    userId = "client_user",
    authToken = "deb776838a0dca710fffd9c38b06ed133e2d088f",
)

internal val userNo6 = ManualUserInfo(
    userId = "chase",
    authToken = "e5ac05124214f9b19fce67b0b54051adadca2bc5",
)

// netflix demo
//internal val userNo6 = ManualUserInfo(
//    userId = "tester-user-9e0125dc684c39cbe74463317e0c4e42",
//    authToken = "64a73c7fc181f2d89534722c45ef1e5372deb7a2",
//)

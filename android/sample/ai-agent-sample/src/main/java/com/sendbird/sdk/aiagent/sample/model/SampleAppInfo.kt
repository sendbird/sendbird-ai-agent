package com.sendbird.sdk.aiagent.sample.model

import com.sendbird.sdk.aiagent.sample.consts.KeySet
import com.sendbird.sdk.aiagent.sample.consts.Region
import org.json.JSONObject

internal data class SampleAppInfo(
    val region: Region,
    val appId: String,
    val aiAgentId: String
) {
    constructor(json: JSONObject): this(
        region = Region.fromValue(json.getInt(KeySet.region)),
        appId = json.getString(KeySet.appId),
        aiAgentId = json.getString(KeySet.aiAgentId)
    )

    constructor(jsonString: String): this(JSONObject(jsonString))

    fun toJson(): JSONObject {
        return JSONObject().apply {
            put(KeySet.region, region.value)
            put(KeySet.appId, appId)
            put(KeySet.aiAgentId, aiAgentId)
        }
    }
}

// dummy
internal val no1 = SampleAppInfo(
    region = Region.NO1,
    appId = "",
    aiAgentId = ""
)

// AMT warroom
//internal val no2 = SampleAppInfo(
//    region = Region.NO2,
//    appId = "D5628A7E-1AA9-4A84-990C-01FD4AF56082",
//    aiAgentId = "12010c7c-b1f8-4b3e-91b8-4b688ebe4be7"
//)
internal val no2 = SampleAppInfo(
    region = Region.NO2,
    appId = "2FE6BC0F-C3E7-4A27-8549-1A49AE6E3406",
    aiAgentId = "4uYl0g4Cj3Q51u7vlIPdM"
)

// dummy
internal val no3 = SampleAppInfo(
    region = Region.NO3,
    appId = "",
    aiAgentId = ""
)

// dummy
internal val no4 = SampleAppInfo(
    region = Region.NO4,
    appId = "F347B1F0-18EC-43A6-A12A-9EE38957295F",
    aiAgentId = "0aaac811-e891-4a20-acee-d3ad3d4356db"
)

internal val no5 = SampleAppInfo(
    region = Region.NO5,
    appId = "5B306480-5E40-40BA-A702-EA0935B4898D",
    aiAgentId = "4131e150-1845-417a-976f-15d262c66ad1"
)

internal val us3 = SampleAppInfo(
    region = Region.PRODUCTION,
    appId = "10306808-B7F3-436F-9F5C-29F431B47B73",
    aiAgentId = "e4c57465-4773-432e-9740-f0284a951494"
)

internal val no6 = SampleAppInfo(
    region = Region.NO6,
    appId = "6FBE91A6-32D0-4001-99A1-853971DD180B",
    aiAgentId = "7e74ecf7-d544-4582-8375-efd333b86611"
)

// netflix demo
//internal val no6 = SampleAppInfo(
//    region = Region.NO6,
//    appId = "D238FFB1-35D3-4749-A0B1-E1B3202501EB",
//    aiAgentId = "1ee0c3b3-59b5-48eb-94fe-a17eaa47d145"
//)

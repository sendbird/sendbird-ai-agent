---
hidden: true
---

# Multi-turn testing (WIP)

A test set is a group of test conversations bundled together to be evaluated at once. Instead of running tests one by one, you can organize multiple conversations into a single set — making it easier to check your AI agent's performance across a variety of scenarios in a single run. It helps you test multiple user intents, edge cases and failure scenarios, and consistency across shared assets such as Knowledge and Actionbooks.

## List test sets

Retrieves a list of test sets (test suites) for a specific AI agent.

#### API specification

**HTTP request**

GET /v1/ai\_agents/{aiAgent}/test\_conversation\_suites

**Parameters**

| Required | Type   | Description                                                 |
| -------- | ------ | ----------------------------------------------------------- |
| aiAgent  | string | The unique ID of the AI agent associated with the test set. |

**Query parameters**

| Optional    | Type    | Description                                               |
| ----------- | ------- | --------------------------------------------------------- |
| page\_size  | integer | The maximum number of results to return in a single page. |
| page\_token | string  | A token used to retrieve the next page of results .       |

\\

**Sample response**

If successful, this action returns an array of test sets.

{

"test\_conversation\_suites": \[

{

"id": "ts\_abc123",

"name": "Sign-up error flow",

"created\_at": "2025-04-10T12:00:00Z"

},

{

"id": "ts\_def456",

"name": "Password reset scenarios",

"created\_at": "2025-04-08T08:45:00Z"

}

],

"next\_page\_token": null,

"prev\_page\_token": null

}

\\

## Get a test set

Retrieves details of a single test set, including its conversations and configuration.

#### API specification

**HTTP request**

\\

GET /v1/ai\_agents/{aiAgent}/test\_conversation\_suites/{testConversationSuite}

**Parameters**

| Required              | Type   | Description                                                 |
| --------------------- | ------ | ----------------------------------------------------------- |
| aiAgent               | string | The unique ID of the AI agent associated with the test set. |
| testConversationSuite | string | The ID of the test set to retrieve.                         |

**Sample response**

If successful, this action returns a metadata and full configuration of the test set.

{

"id": "suite\_001",

"description": "Covers greetings, fallback, and product FAQs",

"created\_at": "2025-05-01T10:20:30Z",

"updated\_at": "2025-05-07T15:12:00Z"

}

## Run a test set

This endpoint allows you to trigger a test run for the specified test set. Returns a test result ID you can use to track or retrieve the result later.

#### API specification

**HTTP request**

\\

POST /v1/ai\_agents/{aiAgent}/test\_conversation\_suites/{testConversationSuite}:run

\\

**Parameters**

| Required              | Type   | Description                                                 |
| --------------------- | ------ | ----------------------------------------------------------- |
| aiAgent               | string | The unique ID of the AI agent associated with the test run. |
| testConversationSuite | string | The ID of the test set to run.                              |

**Response**

If successful, this action returns the ID of the result object created for the test run.

{

"test\_conversation\_suite\_result\_id": "result\_789"

}

## Webhook for test results

Sendbird AI Agent supports webhooks for test execution events to help teams monitor and validate AI behavior in real time. When a test suite is executed, a webhook can be triggered to notify your system of the test results, including pass/fail counts and overall status.

By subscribing to test result webhooks, you can automate workflows such as logging test outcomes, triggering alerts for regressions, or visualizing performance trends. When enabled, your server will receive an HTTP POST request from the Sendbird server each time a test run is completed.

## Event payload

The following is a sample webhook payload of test result events.\
Payload

{

"id": "result\_abc123",

"test\_conversation\_suite\_id": "suite\_456",

"executed\_at": "2025-05-09T06:18:19.887Z",

"state": "DONE",

"total\_count": 5,

"success\_count": 4,

"failure\_count": 1,

"duration": "45s",

"is\_ai\_agent\_changed": true

}

\
\
\
\
\\

## View test conversation results

Retrieves the detailed pass or fail results for each test conversation in a specific test suite run. This helps you understand which individual tests failed and why.

#### API specification

**HTTP request**

\\

GET /v1/ai\_agents/{aiAgent}/test\_conversation\_suites/{testConversationSuite}/results/{result}/test\_conversation\_results

\\

**Parameters**

| Required              | Type   | Description                                                        |
| --------------------- | ------ | ------------------------------------------------------------------ |
| aiAgent               | string | The unique ID of the AI agent associated with the test run.        |
| testConversationSuite | string | The unique ID of the test set that was executed.                   |
| result                | string | The unique ID of the test set result generated from the execution. |

**Query parameters**

| Optional    | Type    | Description                                               |
| ----------- | ------- | --------------------------------------------------------- |
| page\_size  | integer | The maximum number of results to return in a single page. |
| page\_token | string  | A token used to retrieve the next page of results .       |

**Response**

If successful, this action returns a list of test conversation results objects.

{

"test\_conversation\_results": \[

{

"id": "tcr\_12345",

"test\_conversation\_id": "tc\_001",

"test\_conversation\_title": "Greeting flow",

"state": "FAILED",

"executed\_at": "2025-05-09T10:23:00Z",

"messages": \[

{

"role": "USER",

"text": "Hi",

"expected\_text": ""

},

{

"role": "AI\_AGENT",

"text": "Hello there!",

"expected\_text": "Hello! How can I help you today?"

}

],

"failure": {

"question\_index": 0,

"answer\_index": 1,

"reason": "Expected greeting did not match"

}

}

],

"next\_page\_token": null,

"prev\_page\_token": null

}

\\

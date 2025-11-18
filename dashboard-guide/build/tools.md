---
hidden: true
---

# Tools

The Tools menu lets you add APIs that expand your AI agent’s capabilities when used within Actionbooks.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeZM6uOzipkuT0A42dKjaCGiB9Aa2nHPcJYdFUt2Z2f_0anzRDahvXhCtRK1deG-lLGZkjZQ6oL-kfeDaWBAodr5CSQuYhlqyzBqqCvVwyV51ks9DOjS8ev-noS3e5pvIHqu_Tx4Q?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

Click on **Add Tool+** and fill in the following information:

**Basic information**

<table><thead><tr><th width="240.8203125">Field</th><th>Description</th></tr></thead><tbody><tr><td>Tool name</td><td><p>Add a descriptive name to help users quickly understand what this tool does. Enter using only letters and underscores.<br></p><p><strong>Example:</strong> cancel_order</p></td></tr><tr><td>Backup response</td><td>Enter a backup response for when the tool fails to work, helping keep the conversation smooth.</td></tr></tbody></table>

**Header**

Header of API request. The key and value can only be static.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXclG3rdVTUUynJp8rr6350zb19qby-yxElfbdjPSGoknEVmSHkTsIADc7i-29K9lRiKKnA58pcSraMa0sA6qiP0hibR_-iWOoG84mxdID8KPtRpaxRtqaZXnFRt4bRc4mKFigulvw?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

**Method & URL**

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe979_gITdVFBdguq7nvJbTu81PmCZb0fhMrJYTeCQXIu7bnnywrSWF8XmrYLgqKYE0CQ7WIGVpKIketCw4bD6z4j0qexcTOR4yJXkfRZiYXoYzMA06C_Ns7WAu1puzHuHkTVtcNA?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

Method and URL of the API request:

* Supported methods: POST, GET, PUT, PATCH, DELETE
* Dynamic parameters available in URL
  * Conversation ID (channelURL)
  * User ID (Sendbird user ID)
  * User email (Sendbird’s default user attributes)
  * User phone number (Sendbird’s default user attribute)
  * From conversation: AI will generate or request based on context

**Request body**

Request body of API request.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdl2AxRE8p_OtL1XOfgeYS5KMYkhpOLykzZMiOWCs4m3_gYmqxX_EF-u0LDNfTP2bgY6aP-8sppIsFT2EVaHUVf95L77QaVvaXFtt1jf8YdUZS9dPY1NavXyBPv_YnJo1eDLMPd?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

* Dynamic parameters available in URL
  * Conversation ID (channelURL)
  * User ID (Sendbird user ID)
  * User email (Sendbird’s default user attributes)
  * User phone number (Sendbird’s default user attribute)
  * From conversation: AI will generate or request based on context
* Static parameter supported

The AI agent automatically uses the tool’s response to generate the most relevant answer based on context and instruction.

**Send request & Test**

Click **Send request** to test whether the header, URL, request body correctly works (status and response) and the relevant output response (“Message preview”) is generated.\\

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeqp9V5_guhOeQUcRZmpWhE9xq_jzbAYZ64AR6NKGWuYYezqepD-napXbXEhWG4eZ33SxhlTydDJt5-f6lmrn6sT2eMbNHpqoynlI8mk4liHz_urU7g9VUfNG6hvT0pzhcab2KQNg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXd5IWumK7yn-o_8XcpOPQ7dWPSg5_hNkcevYTOQUHmUu3yuYpKWAyLZG4mb2TJ3c4iw4-fd1ItpGPFOXhayrov36BcdfYm-PEfilyuqp6vFP5cV-hUMaPkq9KtnOYQzV7QFQXoYrw?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

For dynamic values such as Conversation ID, the customer can input a test value for testing. For other values we cannot generate such as the AI generated response, you would need to use the Agent tester either in Actionbooks or other Build pages.

---
hidden: true
---

# multipart request

### Coming soon - Multipart request

If your request contains a file, you should send a **Multipart** request. To make that request, specify `multipart/form-data` in the `Content-Type` header, as well as a `boundary`, which is a delimiter string that separates each data field. Sendbird AI agent plans to roll out a multipart file upload of up to five files, each 10MB max.

#### Supported format

* JSON
* PDF
* TXT
* MD
* CSV

#### 작동 방식

* 단일 multipart/form-data 요청으로 첨부 파일이 있는 스니펫 생성
* 파일 내용은 질문/답변과 함께 임베딩되어 사용
* AI는 답변 시 해당 파일 내용도 활용
* 요약 자동 생성

#### HTTP request sample

```http
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryXYZ123

------WebKitFormBoundaryXYZ123
Content-Disposition: form-data; name="data"

{
  "source_type": "snippet",
  "question": "What are the Q1 sales figures for the Northeast region?",
  "answer": "The Northeast region had $2.4M in sales for Q1, exceeding targets by 12%. See attached files for a detailed breakdown."
}
------WebKitFormBoundaryXYZ123
Content-Disposition: form-data; name="attachment"; filename="q1-2025-sales-figures.pdf"
Content-Type: application/pdf

(binary contents of q1-2025-sales-figures.pdf)
------WebKitFormBoundaryXYZ123
Content-Disposition: form-data; name="attachment"; filename="q1-2025-sales-data.csv"
Content-Type: text/csv

(text contents of q1-2025-sales-data.csv)
------WebKitFormBoundaryXYZ123--
```

\\

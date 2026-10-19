# Java Interview Practice

React + Vite + JavaScript, locally bundled Monaco Editor, and basic CSS.

## Run

```sh
npm install
npm run dev
```

## Build and checks

```sh
npm run build
npm run preview
npm run check:data
npm run check:java
npm run check:mcqs
npm run check:render
npm run check:framework
npm run check:browser
```

Node 20 is recommended. Java checks require JDK 21; non-Java-21 exercises compile with `--release 17`.

Framework checks use existing compatible JARs in the local Maven cache (`JAVA_PRACTICE_M2_ROOT` can override its location); they do not install dependencies. JDBC edge checks use a cached H2 driver if available. Browser checks require a running app and Chrome or Edge; set `JAVA_PRACTICE_BROWSER` to override the executable and `JAVA_PRACTICE_URL` to override the default `http://127.0.0.1:5173/`. These tools are optional development checks, not application dependencies.

## Practice banks

- 100 debugging MCQs: 60 medium, 40 hard.
- 50 practical coding challenges: 20 medium, 30 hard.
- Both banks cover the same 22 topics, grouped into Core Java (12) and Spring Framework (10).
- Java 17 is the baseline; Java 21 features are explicitly identified.
- Spring exercises target Boot 3 / Framework 6 with Jakarta imports. Exercises using `@MockitoBean` explicitly require Boot 3.4+.

MCQ rows live in `src/data/mcq-bank.js`; `mcqs.js` assigns IDs, categories, and difficulty. Coding exercises are split between `core-challenges.js` and `spring-challenges.js`. `topics.js` owns the shared category list. `challenge-helpers.js` assembles standalone Java harnesses and framework snippet records.

MCQ choices and submissions, score, and editor drafts are React state. They survive navigation and mode switches, and clear on refresh. No persistent browser storage, backend, database, login, or execution API is part of this application.

## Execution and verification

See [AUDIT.md](AUDIT.md) for the final review results, corrections, and verification limits.

Run Code and Run Tests are intentionally disabled until a real Java execution provider is connected. Expected behavior and solutions are authored reference material, never fabricated compiler output. A plain Java runner will not execute Spring, database, Redis, broker, Docker, or JUnit integration exercises without their named dependencies and project context.

Data validation checks totals, difficulty splits, category coverage, required fields, IDs, and duplicate titles. Java validation compiles all 24 standalone starters and solutions, executes their examples, and checks contract edge cases including concurrency, failure propagation, defensive copies, DST, and optional in-memory JDBC transactions. MCQ checks verify 30 representative Java snippets, including intentional compilation failures.

Framework checks compile the remaining 26 starters and solutions against real Spring Boot 3 / Framework 6 libraries. Documented domain types are supplied as test fixtures. Fifteen unit-contract suites cover selected framework behavior without contacting external services. They do not prove full database/JPA, Redis, Kafka, real-issuer JWT, Feign, or Docker integration behavior.

Browser checks exercise scoring, answer reset/review, filters for all 22 topics in both modes, 20-item navigator pagination, four-column layout, Monaco draft persistence and code templates, disabled execution, and mobile width. Render checks also verify that unsubmitted answers stay hidden.

## Technical references

Reference examples are original exercises. Relevant official documentation consulted for version-specific behavior:

- [Spring Boot 3 documentation](https://docs.spring.io/spring-boot/3.5/reference/using/index.html)
- [Spring Framework 6 transaction annotations and proxy boundaries](https://docs.spring.io/spring-framework/reference/6.2/data-access/transaction/declarative/annotations.html)
- [Spring Framework 6 cache annotations](https://docs.spring.io/spring-framework/reference/6.2/integration/cache/annotations.html)
- [Spring Data JPA query methods and modifying queries](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html)
- [Spring Security 6 JWT resource server](https://docs.spring.io/spring-security/reference/6.5/servlet/oauth2/resource-server/jwt.html)
- [Java 21 virtual threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)

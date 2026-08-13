export function QuestionCards({ questions }: { questions: string[] }) {
  return (
    <section className="question-section" aria-labelledby="question-title">
      <div className="section-heading"><p className="eyebrow">Питання створюють рух</p><h2 id="question-title">З чого почнемо?</h2></div>
      <div className="question-grid">
        {questions.map((question) => <a className="question-card" href="/posluhy" key={question} aria-label={`${question}. Перейти до послуг`}><p>{question}</p><span className="question-card-action">Переглянути послуги <i>↗</i></span></a>)}
      </div>
    </section>
  );
}

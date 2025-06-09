import { type Feedback } from "../store/feedbackStore"

export default function FeedbackList({ feedback }: { feedback: Feedback[] }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feedback List</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Write Feedback</button>
      </div>
      <div className="flex flex-col gap-4">
        {feedback.map((feedback) => (
          <div key={feedback.id} className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold">{feedback.title}</h2>
            <p className="text-sm text-gray-500">{feedback.description}</p>
            <div className="flex justify-between items-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Upvote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
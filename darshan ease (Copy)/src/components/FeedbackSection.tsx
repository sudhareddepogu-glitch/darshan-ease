import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle2, MessageSquare, Star, ThumbsUp } from "lucide-react";
import { Badge } from "./ui/badge";

export function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
    }, 5000);
  };

  const recentFeedback = [
    {
      name: "Ramesh Kumar",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent facilities and very well organized. The online booking made our visit smooth and hassle-free.",
      helpful: 24
    },
    {
      name: "Priya Sharma",
      rating: 4,
      date: "5 days ago",
      comment: "Good experience overall. The crowd management during festival was impressive. Accommodation recommendations were helpful.",
      helpful: 18
    },
    {
      name: "Arun Patel",
      rating: 5,
      date: "1 week ago",
      comment: "The live crowd status feature is amazing! Helped us choose the perfect time to visit. Temple staff is very cooperative.",
      helpful: 32
    },
    {
      name: "Lakshmi Iyer",
      rating: 3,
      date: "1 week ago",
      comment: "Decent experience. The temple is beautiful but waiting time was longer than expected. Online booking worked well though.",
      helpful: 12
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2">Feedback & Reviews</h2>
        <p className="text-muted-foreground">
          Share your experience and help us improve our services
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Feedback Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <Card className="border-green-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                  <h3>Thank You for Your Feedback!</h3>
                  <p className="text-muted-foreground">
                    Your valuable feedback has been submitted successfully. We appreciate your time and suggestions.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>
                    Submit Another Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Your feedback helps us serve you better</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Overall Rating *</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= (hoverRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground self-center">
                          {rating === 5 && "Excellent"}
                          {rating === 4 && "Very Good"}
                          {rating === 3 && "Good"}
                          {rating === 2 && "Fair"}
                          {rating === 1 && "Poor"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visitor-name">Your Name *</Label>
                      <Input id="visitor-name" placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visitor-email">Email *</Label>
                      <Input id="visitor-email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visit-date">Date of Visit</Label>
                    <Input id="visit-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Feedback Category *</Label>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Experience</SelectItem>
                        <SelectItem value="cleanliness">Cleanliness</SelectItem>
                        <SelectItem value="staff">Staff Behavior</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="booking">Online Booking</SelectItem>
                        <SelectItem value="crowd">Crowd Management</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Your Comments *</Label>
                    <Textarea
                      id="comments"
                      placeholder="Share your detailed experience, suggestions, or complaints..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="improvement">What can we improve?</Label>
                    <Textarea
                      id="improvement"
                      placeholder="Your suggestions for improvement (optional)"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="anonymous-feedback" className="mt-1" />
                    <label htmlFor="anonymous-feedback" className="text-sm cursor-pointer">
                      Submit this feedback anonymously
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Recent Reviews */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Reviews from Visitors</CardTitle>
              <CardDescription>See what others are saying</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{feedback.name}</p>
                      <p className="text-sm text-muted-foreground">{feedback.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful ({feedback.helpful})
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Stats & Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">4.4</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on 1,247 reviews</p>
              </div>

              <div className="space-y-3">
                {[
                  { stars: 5, count: 856, percentage: 69 },
                  { stars: 4, count: 248, percentage: 20 },
                  { stars: 3, count: 87, percentage: 7 },
                  { stars: 2, count: 37, percentage: 3 },
                  { stars: 1, count: 19, percentage: 1 },
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm w-12">{item.stars} star</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category-wise Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { category: "Cleanliness", rating: 4.6 },
                { category: "Staff Behavior", rating: 4.5 },
                { category: "Facilities", rating: 4.3 },
                { category: "Crowd Management", rating: 4.2 },
                { category: "Online Services", rating: 4.7 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.category}</span>
                    <span className="text-sm font-medium">{item.rating}/5</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(item.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-muted">
            <CardContent className="pt-6">
              <h4 className="mb-3">Contact Us</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> feedback@darshanease.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 XXXXX XXXXX
                </p>
                <p className="text-muted-foreground mt-3">
                  For urgent matters or complaints, please contact us directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

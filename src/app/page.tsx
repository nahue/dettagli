import Link from "next/link";

const mockUrls = [
  "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/7f2aaba6-cb86-4b27-9983-38bda24a38c8-tvktp9.jpg",
  "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/7f3ad45e-a364-4f6a-8668-6440043faaa2-e37z8c.jpg",
  "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/814f9d54-974f-449d-a377-062928225be9-7qvlt8.jpg",
]

const mockImages = mockUrls.map((url, index) => ({
    id: index + 1,
    url,
}))

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}

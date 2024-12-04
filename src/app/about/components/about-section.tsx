import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  return (
    <Card className="bg-background/60 h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">About APNR</CardTitle>
        <CardDescription>Automatic Plate Number Recognition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-justify">
          Automatic Plate Number Recognition (APNR), is a technology that uses optical character recognition on images to read vehicle registration plates. This advanced system can be used for various applications, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Traffic management and law enforcement</li>
          <li>Parking lot access control</li>
          <li>Toll collection systems</li>
          <li>Border control and security</li>
          <li>Vehicle tracking and fleet management</li>
        </ul>
        <p className="text-justify">
          Our APNR project aims to develop a robust and accurate system. By leveraging computer vision and machine learning techniques, we strive to create a solution that is both reliable and adaptable to various conditions and plate formats.
        </p>
      </CardContent>
    </Card>
  )
}

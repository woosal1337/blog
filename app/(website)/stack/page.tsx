import {Container} from "@/components/blocks/container";
import {StackList} from "@/components/blocks/stack-list";

export default function Notes() {
  const desk = [
    {
      name: "25” Z7Y57AA 1080P",
      brand: "HP Omen",
      category: "Monitor",
      imageSrc: "/stack/monitor.png",
    },
    {
      name: "Future Black 4D",
      brand: "Hawk Gaming",
      category: "Chair",
      imageSrc: "/stack/chair.png",
    },
    {
      name: "Vector Wireless",
      brand: "HP Omen",
      category: "Mouse",
      imageSrc: "/stack/gaming-mouse.png",
    },
    {
      name: "1100",
      brand: "HP Omen",
      category: "Keyboard",
      imageSrc: "/stack/keyboard.png",
    },
    {
      name: "Quadcast S",
      brand: "HyperX",
      category: "Microphone",
      imageSrc: "/stack/mic.png",
    },
  ];
  
  const everyday = [
    {
      name: "iPhone 14 Pro Max 256 GB",
      brand: "Apple",
      category: "Phone",
      imageSrc: "/stack/phone.png",
    },
    {
      name: "MacBook M2 Air 13.6”",
      brand: "Apple",
      category: "Laptop",
      imageSrc: "/stack/laptop.png",
    },
    {
      name: "Airpods Pro",
      brand: "Apple",
      category: "Airpods",
      imageSrc: "/stack/airpods.png",
    },
  ];
  
  const gaming = [
    {
      name: "17-CK2003NT -  RTX4090",
      brand: "HP Omen",
      category: "Laptop",
      imageSrc: "/stack/gaming.png",
    },
    {
      name: "27C Curved QHD 240Hz",
      brand: "HP Omen",
      category: "Monitor",
      imageSrc: "/stack/monitor-gaming.png",
    },
    {
      name: "Huntsman V3 Pro",
      brand: "Razer",
      category: "Keyboard",
      imageSrc: "/stack/razer.png",
    },
    {
      name: "FK2-B",
      brand: "Zowie",
      category: "Mouse",
      imageSrc: "/stack/mouse-gaming.png",
    },
    {
      name: "Cloud III Wireless",
      brand: "HyperX",
      category: "Headphones",
      imageSrc: "/stack/head.png",
    },
  ];
  
  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
        <h1 className="tracking-tight text-5xl">Stack</h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-2">
            The technologies & products I use daily for building projects and
            managing my life.
          </p>
        </div>
        <StackList
          title="Desk"
          description="At home, I have a simple setup with a desk, chair, and monitor."
          items={desk}
        />
        <StackList
          title="Everyday"
          description="The devices I carry with me daily to work and around the city."
          items={everyday}
        />
        <StackList
          title="Gaming"
          description="The devices I use for gaming."
          items={gaming}
        />
      </div>
    </Container>
  );
}

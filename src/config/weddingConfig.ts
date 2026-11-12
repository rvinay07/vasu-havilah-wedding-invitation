import { EventDetail, StoryMilestone, GalleryPhoto, BibleVerse } from '../types/wedding';

export const weddingConfig = {
  groomName: "VASU",
  brideName: "MERCY HAVILAH",
  groomFather: "N.JEPHANIAH",
  groomMother: "N.UMA DEVI",
  brideFather: "S.DEENA SHEKHAR",
  brideMother: "S.ESTHER",
  
  contactNumbers: [
    { label: "General Information", number: "+91 8978148996", tel: "+918978148996" },
    { label: "VASU (Groom)", number: "+91 9652296062", tel: "+919652296062" },
    { label: "HOSHI (Family)", number: "+91 6281047922", tel: "+916281047922" }
  ],

  designerCredit: "Designed By ~Vinay · Made with Love",
  
  coreVerse: {
    quote: "Therefore what God has joined together, let no one separate.",
    reference: "Matthew 19:6"
  },

  media: {
    hero: "/assets/images/hero.jpg",
    groom: "/assets/images/groom.jpg",
    bride: "/assets/images/bride.jpg",
    groomParents: "/assets/images/groom-parents.jpg",
    brideParents: "/assets/images/bride-parents.jpg",
    music: "/assets/music/wedding.mp3",
    video: "/assets/videos/wedding.mp4",
  },

  events: {
    ceremony: {
      id: "ceremony",
      title: "Wedding Ceremony",
      eyebrow: "A Sacred Beginning",
      date: "2027-02-03T09:00:00",
      displayDate: "3 February 2027",
      displayTime: "9:00 AM",
      venue: "Mahendra Kalyana Mandapam",
      address: "Tilak Nagar, Guntakal",
      mapsUrl: "https://maps.app.goo.gl/Mic6WHfh54kWS1m6A",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Celebration+of+VASU+%26+MERCY+HAVILAH&dates=20270203T033000Z/20270203T083000Z&details=Holy+Matrimony+of+Vasu+and+Mercy+Havilah.&location=Mahendra+Kalyana+Mandapam,+Tilak+Nagar,+Guntakal",
      schedule: [
        { time: "08:30 AM", text: "Arrival of Guests & Prelude Worship Hymns" },
        { time: "09:00 AM", text: "Holy Matrimony Service & Scripture Readings" },
        { time: "10:00 AM", text: "Sacred Vows & Exchange of Rings" },
        { time: "10:30 AM", text: "Pastoral Blessing & Family Photographs" },
        { time: "11:30 AM", text: "Wedding Feast & Fellowship" }
      ]
    } as EventDetail,

    reception: {
      id: "reception",
      title: "Wedding Reception",
      eyebrow: "An Evening of Joy",
      date: "2027-02-28T19:00:00",
      displayDate: "28 February 2027",
      displayTime: "7:00 PM",
      venue: "Sri Thimmaih Kalyana Mandapam",
      address: "Bollavaram Rural, Proddatur",
      mapsUrl: "https://maps.app.goo.gl/g9VhPVfzPj7Lbq7h9",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+of+VASU+%26+MERCY+HAVILAH&dates=20270228T133000Z/20270228T170000Z&details=Wedding+reception+celebration+of+Vasu+and+Mercy+Havilah.&location=Sri+Thimmaih+Kalyana+Mandapam,+Bollavaram+Rural,+Proddatur",
      schedule: [
        { time: "07:00 PM", text: "Welcoming of Guests & Musical Prelude" },
        { time: "07:30 PM", text: "Grand Entrance of Vasu & Mercy Havilah" },
        { time: "08:00 PM", text: "Opening Prayer & Cake Cutting" },
        { time: "08:30 PM", text: "Dinner Banquet & Celebratory Fellowship" }
      ]
    } as EventDetail
  },

  milestones: [
    {
      id: "providence",
      status: "completed",
      badge: "God's Providence",
      title: "Two Paths, One Purpose",
      scripture: "“We love because He first loved us.” — 1 John 4:19",
      description: "In God’s perfect timing and through the faithful prayers of our families, our paths crossed with peace, shared values, and mutual devotion to Christ."
    },
    {
      id: "engagement",
      status: "completed",
      badge: "Celebrated Milestone",
      title: "Our Engagement Ceremony",
      scripture: "“I have found the one whom my soul loves.” — Song of Solomon 3:4",
      description: "Surrounded by our loved ones and covered in prayer, our engagement was celebrated with joyful praise and devotion as we committed our lifelong journey into God's hands."
    },
    {
      id: "matrimony",
      status: "upcoming",
      badge: "Upcoming · 3 Feb 2027",
      title: "The Holy Matrimony",
      scripture: "“What God has joined together, let no one separate.” — Matthew 19:6",
      description: "We will exchange our sacred wedding vows before God and family at Mahendra Kalyana Mandapam, Tilak Nagar, Guntakal at 9:00 AM."
    },
    {
      id: "reception",
      status: "upcoming",
      badge: "Upcoming · 28 Feb 2027",
      title: "Wedding Reception",
      scripture: "“A cord of three strands is not quickly broken.” — Ecclesiastes 4:12",
      description: "An evening of praise, delightful fellowship, and joyful celebration with family and friends at Sri Thimmaih Kalyana Mandapam, Bollavaram Rural, Proddatur at 7:00 PM."
    }
  ] as StoryMilestone[],

  gallery: [
    { src: "/assets/images/gallery-1.jpg", caption: "A walk of grace and peace", alt: "Vasu and Mercy Havilah portrait 1" },
    { src: "/assets/images/gallery-2.jpg", caption: "Walking together in faith", alt: "Vasu and Mercy Havilah portrait 2" },
    { src: "/assets/images/gallery-3.jpg", caption: "Joy and laughter in His light", alt: "Vasu and Mercy Havilah portrait 3" },
    { src: "/assets/images/gallery-4.jpg", caption: "Joyful beginnings guided by love", alt: "Vasu and Mercy Havilah portrait 4" },
    { src: "/assets/images/gallery-5.jpg", caption: "A cherished promise sealed before God", alt: "Vasu and Mercy Havilah portrait 5" },
    { src: "/assets/images/gallery-6.jpg", caption: "Forever united in His holy love", alt: "Vasu and Mercy Havilah portrait 6" },
  ] as GalleryPhoto[],

  scriptures: [
    {
      quote: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love never fails.",
      reference: "1 Corinthians 13:4–8"
    },
    {
      quote: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up... A cord of three strands is not quickly broken.",
      reference: "Ecclesiastes 4:9–12"
    },
    {
      quote: "And over all these virtues put on love, which binds them all together in perfect unity.",
      reference: "Colossians 3:14"
    },
    {
      quote: "Unless the Lord builds the house, the builders labor in vain. Unless the Lord watches over the city, the guards stand watch in vain.",
      reference: "Psalm 127:1"
    },
    {
      quote: "There is no fear in love. But perfect love drives out fear... We love because He first loved us.",
      reference: "1 John 4:18–19"
    },
    {
      quote: "The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace.",
      reference: "Numbers 6:24–26"
    }
  ] as BibleVerse[]
};


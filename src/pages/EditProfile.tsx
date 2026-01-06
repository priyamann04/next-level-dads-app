import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Camera, Check } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'
import { ROUTES } from '@/lib/routes'

const STAGES_OPTIONS = [
  'Newborn (0-1 year)',
  'Toddler (2-3 years)',
  'Preschool (4-5 years)',
  'Elementary (6-12 years)',
  'Teen (13-17 years)',
  'Adult (18+ years)',
]

const INTERESTS_OPTIONS = [
  'Fitness',
  'Cooking',
  'Outdoors',
  'Tech',
  'Sports',
  'Gaming',
  'Music',
  'Photography',
  'Art',
  'Reading',
  'Travel',
  'DIY',
  'Business',
  'Coffee',
]

const PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
]

const EditProfile = () => {
  const navigate = useNavigate()

  // Mock initial data (would come from user state/database)
  const [name, setName] = useState('John')
  const [age, setAge] = useState('36')
  const [city, setCity] = useState('Toronto')
  const [province, setProvince] = useState('ON')
  const [bio, setBio] = useState('Father of two amazing kids. Love staying active, cooking, and connecting with other dads. Always looking to learn and grow in this journey.')
  const [stages, setStages] = useState<string[]>(['Elementary (6-12 years)', 'Teen (13-17 years)'])
  const [interests, setInterests] = useState<string[]>(['Cooking', 'Fitness', 'Outdoors', 'Tech'])
  const [avatar, setAvatar] = useState(avatarDefaultGrey)

  const toggleStage = (stage: string) => {
    setStages(prev =>
      prev.includes(stage)
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    )
  }

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSave = () => {
    // Would save to database here
    navigate(ROUTES.PROFILE)
  }

  const handlePhotoChange = () => {
    // Would open file picker / camera
    console.log('Change photo')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border px-6 py-5 relative">
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />

        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(ROUTES.PROFILE)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Edit Profile
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6 animate-fade-in">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-primary/20">
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full w-10 h-10"
              onClick={handlePhotoChange}
            >
              <Camera className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <h3 className="font-semibold text-foreground">Basic Information</h3>
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Age</label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your age"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">City</label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Province</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                {PROVINCES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <h3 className="font-semibold text-foreground">About Me</h3>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell other dads about yourself..."
            rows={4}
          />
        </div>

        {/* Children's Age */}
        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <h3 className="font-semibold text-foreground">Children's Age</h3>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {STAGES_OPTIONS.map((stage) => (
              <Badge
                key={stage}
                variant={stages.includes(stage) ? 'default' : 'outline'}
                className="rounded-full cursor-pointer transition-colors"
                onClick={() => toggleStage(stage)}
              >
                {stages.includes(stage) && <Check className="w-3 h-3 mr-1" />}
                {stage}
              </Badge>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <h3 className="font-semibold text-foreground">Interests</h3>
          <p className="text-sm text-muted-foreground">Select your interests</p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS_OPTIONS.map((interest) => (
              <Badge
                key={interest}
                variant={interests.includes(interest) ? 'default' : 'outline'}
                className="rounded-full cursor-pointer transition-colors"
                onClick={() => toggleInterest(interest)}
              >
                {interests.includes(interest) && <Check className="w-3 h-3 mr-1" />}
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button
          className="w-full rounded-full"
          onClick={handleSave}
        >
          Save Changes
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={() => navigate(ROUTES.PROFILE)}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default EditProfile

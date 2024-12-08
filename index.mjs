import {createWriteStream} from 'node:fs'
import {pipeline} from 'node:stream'
import {promisify} from 'node:util'
import fs from 'fs'

const streamPipeline = promisify(pipeline);

const APIBaseURL='http://localhost:1337/api/'
const contentsFolderBasePath = './frontend/content'

const routesSettings = [
  {
    name: 'homepage',
    populate: ['highlight_medias']
  },
  {
    name: 'about',
    populate: ["experience", "skills", "interests", "social_links"]
  },
  {
    name: 'shops-page',
    populate: ["shops_list", "social_links"]
  },
  {
    name: 'projects',
    multiple: true,
    findBy: 'slug',
    subfolder: 'projets',
    populate: [
      "cover_image",
      "skills",
      "main_images",
      "main_images.images",
      "main_images.zoom_images",
      "typography",
      "typography.typo_visual",
      "colors",
      "secondary_images",
    ]
  }
]

const destinationFilePath = (slug, subfolder) => {
  if (subfolder) return `${contentsFolderBasePath}/${subfolder}/${slug}.json`

  return `${contentsFolderBasePath}/${slug}.json`
}

const fetchSlug = async (route, slug) => {
  const endpoint = new URL(`${APIBaseURL}${route.name}`)
  
  route.populate?.forEach((populate, index) => {
    endpoint.searchParams.append(`populate[${index}]`, populate)
  })

  if (route.findBy) {
    endpoint.searchParams.append(`filters[${route.findBy}]`, slug)
  }

  await fetch(endpoint)
    .then(async response => {
      if (response.status !== 200) return
      await streamPipeline(response.body, createWriteStream(destinationFilePath(slug, route.subfolder)))
    })
}

routesSettings.forEach(async route => {
  if (route.subfolder && !fs.existsSync(`${contentsFolderBasePath}/${route.subfolder}`)){
    fs.mkdirSync(`${contentsFolderBasePath}/${route.subfolder}`);
  }

  if (route.multiple) {
    await fetch(`${APIBaseURL}${route.name}?fields[0]=slug`)
      .then(response => response.json())
      .then(response => {
        response.data?.forEach(slug => {
          if (!slug.attributes?.slug) return

          fetchSlug(route, slug.attributes?.slug)
        })
      })
    return
  }

  fetchSlug(route, route.name)
})
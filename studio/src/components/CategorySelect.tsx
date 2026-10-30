import {useEffect, useState} from 'react'
import {Box, Checkbox, Flex, Stack, Text} from '@sanity/ui'
import {set, unset, useClient, type ArrayOfObjectsInputProps} from 'sanity'

type Category = {
  id: string
  title?: string
}

type ReferenceItem = {
  _key: string
  _type: 'reference'
  _ref: string
}

const query = `*[_type == "category"] | order(title asc) {
  "id": select(_id match "drafts.*" => string::split(_id, ".")[1], _id),
  title
}`

export function CategorySelect(props: ArrayOfObjectsInputProps) {
  const client = useClient({apiVersion: '2025-02-19'})
  const [categories, setCategories] = useState<Category[]>([])
  const value = (props.value ?? []) as ReferenceItem[]
  const selected = new Set(value.map((item) => item._ref))

  useEffect(() => {
    let active = true
    const load = () => {
      client.fetch<Category[]>(query, {}, {perspective: 'drafts'}).then((result) => {
        if (active) setCategories(result.filter((category) => category.id))
      })
    }

    load()
    const subscription = client.listen(query).subscribe(load)
    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [client])

  function toggle(id: string) {
    if (props.readOnly) return
    const next = selected.has(id)
      ? value.filter((item) => item._ref !== id)
      : [...value, {_key: id, _type: 'reference' as const, _ref: id}]
    props.onChange(next.length > 0 ? set(next) : unset())
  }

  if (categories.length === 0) {
    return (
      <Text size={1} muted>
        Todavía no hay categorías. Créalas en Work → Categorías.
      </Text>
    )
  }

  return (
    <Stack space={3}>
      {categories.map((category) => (
        <Flex key={category.id} as="label" align="center" gap={3}>
          <Checkbox
            checked={selected.has(category.id)}
            disabled={props.readOnly}
            onChange={() => toggle(category.id)}
          />
          <Box>
            <Text size={1}>{category.title || 'Sin título'}</Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  )
}
